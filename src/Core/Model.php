<?php

namespace Ofernandoavila\Pickup\Core;

class Model {
    public function to_array() {
        return array_filter(json_decode(json_encode($this), true), fn($var) => $var !== null);
    }
}