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

    public function __construct(
        private string $rootPath
    ) {
        $this->createContainer();
    }

    public function init() {
        register_activation_hook($this->rootPath, fn() => $this->install());
        register_deactivation_hook($this->rootPath, fn() => $this->uninstall());

        add_action('rest_api_init', fn() => $this->setup_endpoints());
    }

    public function install() {
        $toInstall = [];

        $toInstall[] = $this->container->resolve(StateRepository::class);
        $toInstall[] = $this->container->resolve(CityRepository::class);
        $toInstall[] = $this->container->resolve(PickupPointRepository::class);

        foreach($toInstall as $repository) {
            $repository->install();
        }
    }
    
    public function uninstall() {
        $toUninstall = [];

        $toUninstall[] = $this->container->resolve(PickupPointRepository::class);
        $toUninstall[] = $this->container->resolve(CityRepository::class);
        $toUninstall[] = $this->container->resolve(StateRepository::class);

        foreach($toUninstall as $repository) {
            $repository->uninstall();
        }
    }

    public function createContainer() {
        $container = new Container();

        $container->register(StateRepository::class, function() use ($container) {
            return new StateRepository($container);
        });
        
        $container->register(StateService::class, function() use ($container) {
            $repository = $container->resolve(StateRepository::class);

            return new StateService($repository);
        });

        $container->register(StateController::class, function() use ($container) {
            $service = $container->resolve(StateService::class);

            return new StateController($service);
        });
        
        $container->register(CityRepository::class, function() use ($container) {
            return new CityRepository($container);
        });

        $container->register(CityService::class, function() use ($container) {
            $repository = $container->resolve(CityRepository::class);

            return new CityService($repository);
        });

        $container->register(CityController::class, function() use ($container) {
            $service = $container->resolve(CityService::class);

            return new CityController($service);
        });
        
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
        
        $container->register(CityValidation::class, function() use ($container) {
            return new CityValidation();
        });

        $this->container = $container;
    }

    public function setup_endpoints() {
        $router = new Router();

        $pickupPointController = $this->container->resolve(PickupPointController::class);
        $stateController = $this->container->resolve(StateController::class);
        $cityController = $this->container->resolve(CityController::class);
        
        $pickupPointValidation = $this->container->resolve(PickupPointValidation::class);
        $cityValidation = $this->container->resolve(CityValidation::class);

        $router->register_route('/status', 'GET', function (WP_REST_Request $request) {
            return new WP_REST_Response([ "version" => '1.0.0', 'status' => 'running' ], 200);
        });
        
        $router->register_route('/getAllAvaible', 'GET', function (WP_REST_Request $request) use ($pickupPointController) {
            return $pickupPointController->getAllPickupPointsAvaible($request);
        });
        
        $router->register_route('/getAll', 'GET', function (WP_REST_Request $request) use ($pickupPointController) {
            return $pickupPointController->getAllPickupPoints($request);
        });
        
        $router->register_route('/create', 'POST', function (WP_REST_Request $request) use ($pickupPointController) {
            return $pickupPointController->createPickupPoint($request);
        }, function (WP_REST_Request $request) use ($pickupPointValidation) {
            return $pickupPointValidation->on_create_validation($request);
        });

        $router->register_route('/states/getAll', 'GET', function (WP_REST_Request $request) use ($stateController) {
            return $stateController->getAllStates($request);
        });
        
        $router->register_route('/cities/getAll', 'GET', function (WP_REST_Request $request) use ($cityController) {
            return $cityController->getAllCities($request);
        });

        $router->register_route('/cities/create', 'POST', function (WP_REST_Request $request) use ($cityController) {
            return $cityController->createCity($request);
        }, function (WP_REST_Request $request) use ($cityValidation) {
            return $cityValidation->on_create_validation($request);
        });

        $router->publish();
    }
}