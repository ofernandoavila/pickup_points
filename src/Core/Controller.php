<?php

namespace Ofernandoavila\Pickup\Core;

use WP_REST_Response;

class Controller {
    public function EnviarResponse(array $data = [], int $statusCode = 200) {
        return new WP_REST_Response($data, $statusCode);
    }
}