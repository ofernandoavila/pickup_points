<?php

namespace Ofernandoavila\Pickup\Model;

use Ofernandoavila\Pickup\Core\Model;

class State extends Model {
    
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
}