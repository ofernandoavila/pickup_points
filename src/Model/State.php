<?php

namespace Ofernandoavila\Pickup\Model;

class State {
    
    public function __construct(
        public ?int $id = null,
        public string $label,
        public string $abbreviation,
        public bool $active = true,
    ) {}

    public static function Map(array $data) {
        if(empty($data) || !isset($data)) throw new \Exception('The argument cannot be empty or null');
    
        return new State(
            id: $data['id'] ? intval($data['id']) : null,
            label: $data['label'],
            abbreviation: $data['abbreviation'],
            active: $data['active'] ?? true,
        );
    }

    public function to_array() {
        return array_filter(json_decode(json_encode($this), true), fn($value) => $value !== null );
    }
}