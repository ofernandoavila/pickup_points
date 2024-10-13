<?php

namespace Ofernandoavila\Pickup\Model;

use Ofernandoavila\Pickup\Core\Model;

class PickupPoint extends Model {

    public function __construct(
        public ?int $id = null,
        public string $name = '',
        public string $address = '',
        public int $city_id = 0,
        public int $state_id = 0,
        public string $cnpj = '',
        public int $deadline = 0,
        public float $cost = 0.00,
        public string $phone = '',
        public string $hour = '',
        public ?string $observation = null,
        public bool $active = true,
    ) {}
    
    public $state;
    public $city;

    public static function Map(array $data) {
        if(empty($data) || !isset($data)) throw new \Exception('The argument cannot be empty or null');
    
        return new PickupPoint(
            id: $data['id'] ? intval($data['id']) : null,
            name: $data['name'],
            address: $data['address'],
            city_id: $data['city_id'] ? intval($data['city_id']) : null,
            state_id: $data['state_id'] ? intval($data['state_id']) : null,
            cnpj: $data['cnpj'],
            deadline: $data['deadline'] ? intval($data['deadline']) : null,
            cost: $data['cost'] ? floatval($data['cost']) : null,
            phone: $data['phone'],
            hour: $data['hour'],
            observation: $data['observation'] ?? null,
            active: $data['active'] ?? true,
        );
    }
}