<?php

namespace Ofernandoavila\Pickup\Core;

use Exception;

class Container {

    private $bindings = [];

    public function register(string $class, mixed $resolver) {
        $this->bindings[$class] = $resolver;
    }

    public function resolve(string $class) {
        if(!isset($this->bindings[$class])) {
            throw new Exception("[Container] Service not found: " . $class);
        }
        
        return call_user_func($this->bindings[$class]);
    }
}