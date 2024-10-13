<?php

namespace Ofernandoavila\Pickup\Repository;

use Ofernandoavila\Pickup\Core\Repository;
use Ofernandoavila\Pickup\Interface\IInstallDB;
use Ofernandoavila\Pickup\Model\State;

class StateRepository extends Repository implements IInstallDB {
    public string $table_name = 'wp_pickup_points_state';

    public function install() {
        $this->db->query("CREATE TABLE IF NOT EXISTS " . $this->table_name . " (
                                    id INT NOT NULL AUTO_INCREMENT,
                                    label varchar(500) NOT NULL,
                                    abbreviation varchar(2) NOT NULL,
                                    active tinyint(1) DEFAULT 1 NOT NULL,
                                    PRIMARY KEY (id) 
                                );");

        $query = "INSERT INTO $this->table_name (`label`, `abbreviation`) VALUES \n";
        $query .=                                   "('Acre', 'AC')," . "\n";
        $query .=                                   "('Alagoas', 'AL')," . "\n";
        $query .=                                   "('Amapá', 'AP')," . "\n";
        $query .=                                   "('Amazonas', 'AM')," . "\n";
        $query .=                                   "('Bahia', 'BA')," . "\n";
        $query .=                                   "('Ceará', 'CE')," . "\n";
        $query .=                                   "('Espírito Santo', 'ES')," . "\n";
        $query .=                                   "('Goiás', 'GO')," . "\n";
        $query .=                                   "('Maranhão', 'MA')," . "\n";
        $query .=                                   "('Mato Grosso', 'MT')," . "\n";
        $query .=                                   "('Mato Grosso do Sul', 'MS')," . "\n";
        $query .=                                   "('Minas Gerais', 'MG')," . "\n";
        $query .=                                   "('Pará', 'PA')," . "\n";
        $query .=                                   "('Paraíba', 'PB')," . "\n";
        $query .=                                   "('Paraná', 'PR')," . "\n";
        $query .=                                   "('Pernambuco', 'PE')," . "\n";
        $query .=                                   "('Piauí', 'PI')," . "\n";
        $query .=                                   "('Rio de Janeiro', 'RJ')," . "\n";
        $query .=                                   "('Rio Grande do Norte', 'RN')," . "\n";
        $query .=                                   "('Rio Grande do Sul', 'RS')," . "\n";
        $query .=                                   "('Rondônia', 'RO')," . "\n";
        $query .=                                   "('Roraima', 'RR')," . "\n";
        $query .=                                   "('Santa Catarina', 'SC')," . "\n";
        $query .=                                   "('São Paulo', 'SP')," . "\n";
        $query .=                                   "('Sergipe', 'SE')," . "\n";
        $query .=                                   "('Tocantins', 'TO')," . "\n";
        $query .=                                   "('Distrito Federal', 'DF')";

        return $this->db->query($query);
    }

    public function getById(int $id) {
        $result = $this->db->get_row("SELECT * FROM $this->table_name WHERE `id` = $id;", ARRAY_A);
    
        return State::Map($result);
    }

    public function getAll(array $filter = []) {
        $query = "SELECT * FROM $this->table_name";
        $conditions = [];
        
        if(isset($filter['label'])) {
            $conditions[] = "label LIKE '%" . $filter['label'] . "%'";
        }
        
        if(isset($filter['abbreviation'])) {
            $conditions[] = "abbreviation LIKE '%" . $filter['abbreviation'] . "%'";
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
            $result[] = State::Map($row);
        }

        return $result;
    }
}