<?php

namespace Ofernandoavila\Pickup\Trait;

trait RequestHandleTrait {
    protected function get_body_content(\WP_REST_Request $request) {
        return json_decode($request->get_body(), true);
    }

    protected function get_params(\WP_REST_Request $request) {
        return $request->get_params();
    }

    protected function send_response(array $data = [], string $message = '', int $statusCode = 200) {

        $response = [
            "code" => $statusCode,
            "message" => $message,
            "data" => $data
        ];

        return new \WP_REST_Response($response, $statusCode);
    }

    protected function send_error(string $message, array $errors = []) {
        return new \WP_Error('Pickup Points Error', $message, $errors);
    }
}