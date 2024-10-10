<?php

namespace Ofernandoavila\Pickup\Controller;

use Ofernandoavila\Pickup\Core\Controller;
use Ofernandoavila\Pickup\Service\StateService;
use WP_REST_Request;

class StateController extends Controller {
    public function __construct(
        protected StateService $service
    ) {}

    public function getAllStates(WP_REST_Request $request) {
        $filter = $this->get_params($request);

        return $this->send_response(
            data: $this->service->getAllStates($filter)
        );
    }
}