<?php

namespace Ofernandoavila\Pickup\Core;

use Ofernandoavila\Pickup\Controller\CityController;
use Ofernandoavila\Pickup\Controller\PickupPointController;
use Ofernandoavila\Pickup\Controller\StateController;
use Ofernandoavila\Pickup\Repository\CityRepository;
use Ofernandoavila\Pickup\Repository\PickupPointRepository;
use Ofernandoavila\Pickup\Repository\StateRepository;
use Ofernandoavila\Pickup\Service\CityService;
use Ofernandoavila\Pickup\Service\PickupPointService;
use Ofernandoavila\Pickup\Service\StateService;
use Ofernandoavila\Pickup\Validation\CityValidation;
use Ofernandoavila\Pickup\Validation\PickupPointValidation;
use WP_REST_Request;
use WP_REST_Response;

require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

class Bootstrap {
    private Container $container;
    private array $dependencies;

    public function __construct(
        private string $rootPath
    ) {
        $this->createContainer();

        $this->dependencies[] = $this->container->resolve(StateRepository::class);
        $this->dependencies[] = $this->container->resolve(CityRepository::class);
        $this->dependencies[] = $this->container->resolve(PickupPointRepository::class);
    }

    public function init() {
        register_activation_hook($this->rootPath, fn() => $this->install());
        register_deactivation_hook($this->rootPath, fn() => $this->uninstall());

        add_action('rest_api_init', fn() => $this->setup_endpoints());
    }

    public function install() {
        foreach($this->dependencies as $repository) {
            $repository->install();
        }
    }
    
    public function uninstall() {
        foreach($this->dependencies as $repository) {
            $repository->uninstall();
        }
    }

    public function createContainer() {
        $container = new Container();

        #region State

        $container->register(StateRepository::class, function() use ($container) {
            return new StateRepository($container);
        });
        
        $container->register(StateService::class, function() use ($container) {
            return new StateService($container);
        });

        $container->register(StateController::class, function() use ($container) {
            return new StateController($container);
        });

        #endregion
        
        #region City

        $container->register(CityRepository::class, function() use ($container) {
            return new CityRepository($container);
        });

        $container->register(CityService::class, function() use ($container) {
            return new CityService($container);
        });

        $container->register(CityController::class, function() use ($container) {
            return new CityController($container);
        });

        $container->register(CityValidation::class, function() use ($container) {
            return new CityValidation($container);
        });

        #endregion
        
        #region PickupPoint

        $container->register(PickupPointRepository::class, function() use ($container) {
            return new PickupPointRepository($container);
        });
        
        $container->register(PickupPointService::class, function() use ($container) {
            $repository = $container->resolve(PickupPointRepository::class);

            return new PickupPointService($repository);
        });
        
        $container->register(PickupPointController::class, function() use ($container) {
            $service = $container->resolve(PickupPointService::class);

            return new PickupPointController($service);
        });
        
        $container->register(PickupPointValidation::class, function() use ($container) {
            return new PickupPointValidation();
        });

        #endregion
        
        $this->container = $container;
    }

    public function setup_endpoints() {
        $router = new Router();
        $container = $this->container;

        #region City

        $router->register_route('/cities/getAll', 'GET', function (WP_REST_Request $request) use ($container) {
            return $container->resolve(CityController::class)->getAll($request);
        });
        
        $router->register_route('/cities/getCount', 'GET', function (WP_REST_Request $request) use ($container) {
            return $container->resolve(CityController::class)->getCount($request);
        });

        $router->register_route('/cities/create', 'POST', function (WP_REST_Request $request) use ($container) {
            return $container->resolve(CityController::class)->create($request);
        }, function (WP_REST_Request $request) use ($container) {
            return $container->resolve(CityValidation::class)->on_create_validation($request);
        });
        
        $router->register_route('/cities/update', 'POST', function (WP_REST_Request $request) use ($container) {
            return $container->resolve(CityController::class)->update($request);
        }, function (WP_REST_Request $request) use ($container) {
            return $container->resolve(CityValidation::class)->on_edit_validation($request);
        });
        
        $router->register_route('/cities/delete', 'DELETE', function (WP_REST_Request $request) use ($container) {
            return $container->resolve(CityController::class)->delete($request);
        });

        #endregion
        
        #region PickupPoints
        
        $router->register_route('/getAllAvaible', 'GET', function (WP_REST_Request $request) use ($container) {
            return $container->resolve(PickupPointController::class)->getAllPickupPointsAvaible($request);
        });
        
        $router->register_route('/getAll', 'GET', function (WP_REST_Request $request) use ($container) {
            return $container->resolve(PickupPointController::class)->getAllPickupPoints($request);
        });
        
        $router->register_route('/create', 'POST', function (\WP_REST_Request $request) use ($container) {
            return $container->resolve(PickupPointController::class)->createPickupPoint($request);
        }, function (\WP_REST_Request $request) use ($container) {
            return $container->resolve(PickupPointValidation::class)->on_create_validation($request);
        });

        #endregion

        #region State
        
        $router->register_route('/states/getAll', 'GET', function (WP_REST_Request $request) use ($container) {
            return $container->resolve(StateController::class)->getAll($request);
        });
        
        #endregion
        
        #region App
        
        $router->register_route('/status', 'GET', function (\WP_REST_Request $request) {
            return new WP_REST_Response([ "version" => '1.0.0', 'status' => 'running' ], 200);
        });
        
        #endregion

        $router->publish();
    }
}