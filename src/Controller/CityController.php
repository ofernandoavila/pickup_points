<?php

namespace Ofernandoavila\Pickup\Controller;

use Ofernandoavila\Pickup\Core\Controller;
use Ofernandoavila\Pickup\Service\CityService;
use Ofernandoavila\Pickup\Service\StateService;
use WP_REST_Request;

class CityController extends Controller {
    public function __construct(
        protected CityService $service
    ) {}

    public function getAllCities(WP_REST_Request $request) {
        $filter = $this->get_params($request);

        return $this->send_response(
            data: $this->service->getAllCities($filter)
        );
    }

    public function createCity(WP_REST_Request $request) {
        return $this->send_response(
            data: $this->service->save($this->get_body_content($request)) ? [ "Cidade salva!" ] : [ "erro ao criar!" ]
        );
    }
}