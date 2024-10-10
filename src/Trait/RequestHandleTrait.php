<?php

namespace Ofernandoavila\Pickup\Trait;

trait RequestHandleTrait {
    protected function get_body_content(\WP_REST_Request $request) {
        return json_decode($request->get_body(), true);
    }

    protected function get_params(\WP_REST_Request $request) {
        return $request->get_params();
    }

    protected function send_response(array $data = [], int $statusCode = 200) {
        return new \WP_REST_Response($data, $statusCode);
    }

    protected function send_error(string $message, array $errors = []) {
        return new \WP_Error('Pickup Points Error', $message, $errors);
    }
}