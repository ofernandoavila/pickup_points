<?php

namespace Ofernandoavila\Pickup\Controller;

use Ofernandoavila\Pickup\Core\Controller;
use Ofernandoavila\Pickup\Service\PickupPointService;
use WP_REST_Request;

class PickupPointController extends Controller {

    protected PickupPointService $service;

    public function __construct()
    {
        $this->service = new PickupPointService();
    }

    public function getAllPickupPointsAvaible(WP_REST_Request $request) {
        return $this->EnviarResponse(
            data: $this->service->getAllPickupPointsActives()
        );
    }
    
    public function getAllPickupPoints(WP_REST_Request $request) {
        return $this->EnviarResponse(
            data: $this->service->getAllPickupPoints()
        );
    }
}