<?php

namespace Ofernandoavila\Pickup\Model;

class City {
    
    public function __construct(
        public ?int $id = null,
        public int $state_id = 0,
        public string $label = ''
    ) {}

    public $state;
    public string $state_name;

    public static function Map(array $data) {
        if(empty($data) || !isset($data)) throw new \Exception('The argument cannot be empty or null');
    
        return new City(
            id: $data['id'] ? intval($data['id']) : null,
            state_id: intval($data['state_id']),
            label: $data['label']
        );
    }

    public function to_array() {
        return json_decode(json_encode($this), true);
    }
}