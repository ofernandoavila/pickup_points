<?php

namespace Ofernandoavila\Pickup\Core;

class Repository {
    public string $table_name;
    public $db;

    public function __construct()
    {
        global $wpdb;

        $this->db = $wpdb;
    }
    
    public function getAll(array $filter = []) {
        $query = "SELECT * FROM $this->table_name";

        if(sizeof($filter) > 0) {
            $query .= $this->get_paginated($filter);
        }

        $result = $this->db->get_results($query);

        return [
            'page' => isset($filter['page']) ? intval($filter['page']) : 1,
            'perPage' => isset($filter['perPage']) ? intval($filter['perPage']) : 10,
            'totalPages' => $this->get_pagination_total_pages($filter),
            'data' => $result,
        ];
    }
    
    public function getCount() {
        return intval($this->db->get_results("SELECT COUNT(*) as count FROM $this->table_name;")[0]->count);
    }

    public function getById(int $id) {
        return $this->db->get_results("SELECT * FROM $this->table_name WHERE `id` = $id;")[0];
    }

    public function uninstall() {
        return $this->db->query("DROP TABLE $this->table_name");
    }

    public function delete(int $id) {
        return $this->db->query("DELETE FROM $this->table_name WHERE `id` = $id;");
    }

    protected function get_paginated(array $filter) {
        $query = '';

        if(isset($filter['perPage'])) {
            $query .= " LIMIT " . $filter['perPage'];
        } else {
            $query .= " LIMIT 10";
        }

        if(isset($filter['page'])) {           
            $offset = isset($filter['perPage']) ?  : intval($filter['page']) * 10;

            $page = isset($filter['page']) ? intval($filter['page']) : 1;
            $perPage = isset($filter['perPage']) ? intval($filter['perPage']) : 10;

            if(intval($filter['page']) == 1) {
                $offset = 0;
            } else {
                $offset = ($perPage * $page) - $perPage;
            }

            $query .= " OFFSET $offset";
        }

        return $query;
    }

    protected function get_pagination_total_pages(array $filter) {
        $totalPages = 0;

        if(sizeof($filter) > 0) {
            if(isset($filter['perPage'])) {
                $totalPages = $this->getCount() / intval($filter['perPage']);
    
                if($this->getCount() % intval($filter['perPage']) > 0) {
                    $totalPages++;
                }
            } else {
                $totalPages = $this->getCount() / 10;
    
                if($this->getCount() % 10 > 0) {
                    $totalPages++;
                }
            }
        } else {
            $totalPages = 1;
        }

        return intval($totalPages);
    }
}