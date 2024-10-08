<?php

namespace Ofernandoavila\Pickup\Repository;

use Ofernandoavila\Pickup\Core\Repository;

class PickupPointRepository extends Repository {
    public string $table_name = 'wp_pickup';

    public function getAllPickupPointsActives() {
        return $this->db->get_results("SELECT * FROM $this->table_name WHERE ativo = 1;");
    }
}