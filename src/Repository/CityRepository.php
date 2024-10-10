<?php

namespace Ofernandoavila\Pickup\Repository;

use Ofernandoavila\Pickup\Core\Container;
use Ofernandoavila\Pickup\Core\Repository;
use Ofernandoavila\Pickup\Interface\IInstallDB;
use Ofernandoavila\Pickup\Model\City;

class CityRepository extends Repository implements IInstallDB {
    public string $table_name = 'wp_pickup_points_city';

    public function __construct(
        protected Container $container
    ) {
        parent::__construct();
    }

    public function install() {
        return $this->db->query("CREATE TABLE " . $this->table_name . " (
                    id INT NOT NULL AUTO_INCREMENT,
                    label varchar(500) NOT NULL,
                    state_id INT NOT NULL,
                    active tinyint(1) DEFAULT 1 NOT NULL,
                    PRIMARY KEY  (id),
                    index(state_id),
                    FOREIGN KEY (state_id) REFERENCES wp_pickup_points_state(id)
                );");
    }

    public function getById(int $id) {
        $result = $this->db->get_row("SELECT * FROM $this->table_name WHERE `id` = $id;", ARRAY_A);
    
        return City::Map($result);
    }
    
    public function save(array $data) {
        return $this->db->insert($this->table_name, City::Map($data)->to_array());
    }

    public function getAll(array $filter = [])
    {
        $query = "SELECT * FROM $this->table_name";
        $conditions = [];
        
        if(isset($filter['label'])) {
            $conditions[] = "label LIKE '%" . $filter['label'] . "%'";
        }

        if(isset($filter['state_id'])) {
            $conditions[] = "state_id = " . $filter['state_id'];
        }
        
        if(isset($filter['active'])) {
            $value = $filter['active'] ? '1' : '0';
            $conditions[] = "active = $value";
        }

        if(sizeof($conditions) > 0) {
            $terms = implode(' AND ', $conditions);
            $query .= " WHERE " . $terms . ';';
        }

        if(isset($filter['orderBy'])) {
            $value = $filter['orderBy'];
            $query .= " ORDER BY $value";
            
            if(isset($filter['desc'])) {
                $type = $filter['desc'] ? 'DESC' : 'ASC';
                $query .= " " . $type;
            }
        } else {
            $query .= " ORDER BY state_id ASC";
        }

        $result = [];

        foreach($this->db->get_results($query, ARRAY_A) as $row) {
            $city = City::Map($row);

            $city->state = $this->container->resolve(StateRepository::class)->getById($row['state_id']);
            $city->state_name = $city->state->label;

            $result[] = $city;
        }

        return $result;
    }
}