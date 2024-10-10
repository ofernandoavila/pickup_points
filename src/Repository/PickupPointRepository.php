<?php

namespace Ofernandoavila\Pickup\Repository;

use Ofernandoavila\Pickup\Core\Container;
use Ofernandoavila\Pickup\Core\Repository;
use Ofernandoavila\Pickup\Model\City;
use Ofernandoavila\Pickup\Model\PickupPoint;
use Ofernandoavila\Pickup\Interface\IInstallDB;

class PickupPointRepository extends Repository implements IInstallDB {
    public string $table_name = 'wp_pickup_points';

    public function __construct(
        protected Container $container
    ) {
        parent::__construct();
    }

    public function getAllPickupPointsActives() {
        return $this->db->get_results("SELECT * FROM $this->table_name WHERE ativo = 1;");
    }

    public function install()
    {
        return $this->db->query("CREATE TABLE " . $this->table_name . " (
                    id INT NOT NULL AUTO_INCREMENT,
                    name varchar(500) NOT NULL,
                    address varchar(500) NOT NULL,
                    city_id INT NOT NULL,
                    state_id INT NOT NULL,
                    cnpj varchar(500) NOT NULL,
                    deadline int NOT NULL,
                    cost DECIMAL(10,2) NOT NULL ,
                    phone varchar(500) NOT NULL,
                    hour varchar(500) NOT NULL,
                    observation varchar(500) NULL,
                    active tinyint(1) DEFAULT 1 NOT NULL,
                    PRIMARY KEY (id),
                    index(city_id),
                    index(state_id),
                    FOREIGN KEY (city_id) REFERENCES wp_pickup_points_city (id),
                    FOREIGN KEY (state_id) REFERENCES wp_pickup_points_state (id)
                );");
    }

    public function getPickupPointByCNPJ(string $cnpj) {
        return $this->db->get_results("SELECT * FROM $this->table_name WHERE cnpj = $cnpj;")[0];
    }
    
    public function getPickupPointByID(int $id) {
        return $this->db->get_results("SELECT * FROM $this->table_name WHERE id = $id;")[0];
    }
    
    public function getPickupPointByCity(City $city) {
        return $this->db->get_results("SELECT * FROM $this->table_name WHERE city_id = $city->id;")[0];
    }
    
    public function save(array $data) {
        return $this->db->insert($this->table_name, PickupPoint::Map($data)->to_array());
    }

    public function getByFilter(array $filter) {
        $query = "SELECT * FROM $this->table_name";
        $conditions = [];

        if(isset($filter['id'])) {
            $conditions[] = "id = " . $filter['id'];
        }
        
        if(isset($filter['name'])) {
            $conditions[] = "name LIKE '%" . $filter['name'] . "%'";
        }
        
        if(isset($filter['address'])) {
            $conditions[] = "address LIKE '%" . $filter['address'] . "%'";
        }
        
        if(isset($filter['city'])) {
            $conditions[] = "city_id = " . $filter['city'];
        }
        
        if(isset($filter['state'])) {
            $conditions[] = "state_id = " . $filter['state'];
        }
        
        if(isset($filter['active'])) {
            $value = $filter['active'] ? '1' : '0';
            $conditions[] = "active = $value";
        }

        if(sizeof($conditions) > 0) {
            $terms = implode(' AND ', $conditions);
            $query .= " WHERE " . $terms . ';';
        }


        $result = [];

        foreach($this->db->get_results($query, ARRAY_A) as $row) {
            $pp = PickupPoint::Map($row);
        
            $pp->city = $this->container->resolve(CityRepository::class)->getById($row['city_id']);
            $pp->state = $this->container->resolve(StateRepository::class)->getById($row['state_id']);

            $result[] = $pp;
        }

        return $result;
    }
}