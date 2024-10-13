<?php

namespace Ofernandoavila\Pickup\Model;

use Ofernandoavila\Pickup\Core\Model;

class City extends Model {
    
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
            id: isset($data['id']) ? intval($data['id']) : null,
            state_id: intval($data['state_id']),
            label: $data['label']
        );
    }
}