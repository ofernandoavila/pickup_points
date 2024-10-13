<?php

namespace Ofernandoavila\Pickup\Core;

use Ofernandoavila\Pickup\Trait\RequestHandleTrait;

class Controller {
    use RequestHandleTrait;

    public function __construct(
        private $service
    ) { }

    public function getAll(\WP_REST_Request $request) {
        $filter = $this->get_params($request);

        return $this->send_response(
            data: $this->service->getAll($filter)
        );
    }

    public function create(\WP_REST_Request $request) {
        try {
            return $this->send_response(
                data: $this->service->save($this->get_body_content($request)) ? [ "Register saved sucessfully!" ] : [ "Error saving register" ]
            );
        } catch (\Exception $ex) {
            return $this->send_error( $ex->getMessage() );
        }
    }
    
    public function update(\WP_REST_Request $request) {
        try {
            return $this->send_response(
                data: $this->service->update($this->get_body_content($request)) ? [ "Register updated sucessfully!" ] : [ "Error updating register" ]
            );
        } catch (\Exception $ex) {
            return $this->send_error( $ex->getMessage() );
        }
    }
    
    public function delete(\WP_REST_Request $request) {
        try {
            $id = $this->get_params($request)["id"];
            return $this->send_response(
                data: $this->service->delete($id) ? [ "Register deleted sucessfully" ] : [ "Error deleting register" ]
            );
        } catch (\Exception $ex) {
            return $this->send_error( $ex->getMessage() );
        }
    }

    public function getCount(\WP_REST_Request $request) {
        try {
            return $this->send_response(
                data: [ 'total' => $this->service->getCount() ]
            );
        } catch (\Exception $ex) {
            return $this->send_error( $ex->getMessage() );
        }
    }
}