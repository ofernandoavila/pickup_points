<?php

namespace Ofernandoavila\Pickup\Controller;

use Ofernandoavila\Pickup\Core\Controller;
use Ofernandoavila\Pickup\Service\PickupPointService;
use WP_REST_Request;

class PickupPointController extends Controller {
    public function __construct(
        protected PickupPointService $service
    ) {}

    public function getAllPickupPointsAvaible(WP_REST_Request $request) {
        return $this->send_response(
            data: $this->service->getAllPickupPointsActives()
        );
    }
    
    public function getAllPickupPoints(WP_REST_Request $request) {
        $filter = $this->get_params($request);

        return $this->send_response(
            data: $this->service->getAllPickupPoints($filter)
        );
    }
    
    public function createPickupPoint(WP_REST_Request $request) {
        return $this->send_response(
            data: $this->service->createPickupPoint($this->get_body_content($request)) ? [ "Balcão criado com sucesso!" ] : [ "erro ao criar!" ]
        );
    }
}