<?php

namespace Ofernandoavila\Pickup\Core;

use Ofernandoavila\Pickup\Controller\PickupPointController;
use WP_REST_Request;
use WP_REST_Response;

require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

class Bootstrap {
    private string $table_name = 'wp_pickup';

    public function init() {
        register_activation_hook(__FILE__, fn() => $this->install());
        register_deactivation_hook(__FILE__, fn() => $this->uninstall());
        
        add_action('rest_api_init', fn() => $this->setup_endpoints());
    }

    public function install() {
        $sql = "CREATE TABLE " . $this->table_name . " (
                    id INT NOT NULL AUTO_INCREMENT,
                    nome varchar(500) NOT NULL,
                    endereco varchar(500) NOT NULL,
                    cidade varchar(500) NOT NULL,
                    uf varchar(2) NOT NULL,
                    cnpj varchar(500) NOT NULL,
                    prazo int NOT NULL ,
                    custo DECIMAL(10,2) NOT NULL ,
                    telefone varchar(500) NOT NULL,
                    horario varchar(500) NOT NULL,
                    obs varchar(500) NULL,
                    ativo tinyint(1) DEFAULT 1 NOT NULL,
                    PRIMARY KEY  (id) 
                );";
        dbDelta( $sql );
    }

    public function uninstall() {
        global $wpdb;

        $wpdb->query( "DROP TABLE IF EXISTS " . $this->table_name );
    }

    public function setup_endpoints() {
        $router = new Router();

        $router->register_route('/status', 'GET', function (WP_REST_Request $request) {
            return new WP_REST_Response([ "version" => '1.0.0', 'status' => 'running' ], 200);
        });
        
        $router->register_route('/pickup_points_avaibles', 'GET', function (WP_REST_Request $request) {
            $controller = new PickupPointController();

            return $controller->getAllPickupPointsAvaible($request);
        });
        
        $router->register_route('/pickup_points', 'GET', function (WP_REST_Request $request) {
            $controller = new PickupPointController();

            return $controller->getAllPickupPoints($request);
        });

        $router->publish();
    }
}