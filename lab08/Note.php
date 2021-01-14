<?php 
    class Note implements NoteInterface{
        private $db_key;
        private $dbh_2;
        private $dbfile_2 = "files/notes.db" ;
        private $email;
        private $wpis_rec;
        private $date;

        function __consturct(){
            session_start() ;
        }

        function _read() {
            $this->email = $_SESSION['user'];
            $this->wpis_rec = $_POST['wpis'];
        }

        function _save_messages(){
            $this->email = $_SESSION['user'];
            $this->date = $_SERVER['REQUEST_TIME'];
            $this->dbh_2 = dba_open($this->dbfile_2, "c");
            $this->db_key = $this->email.'&'.$this->date;
            $serialized_data = serialize($this->wpis_rec) ;
            dba_insert($this->db_key, $serialized_data, $this->dbh_2);
            dba_close($this->dbh_2) ;
        }

        function _read_messages() {
            $this->email = $_SESSION['user'];
            $this->dbh_2 = dba_open($this->dbfile_2, "r");
            $key = dba_firstkey($this->dbh_2);
            $table = array();
            $pattern = "/^" . $this->email . "&/";
            while ($key) {
                if(preg_match($pattern, $key)){
                    $serialized_data = dba_fetch($key, $this->dbh_2);
                    $this->data = unserialize($serialized_data);
                    $this->date = preg_split($pattern, $key)[1];
                    $table[$this->date]['wpis'] = $this->data;
                }
                $key = dba_nextkey($this->dbh_2);
                }
            dba_close($this->dbh_2) ;
            return $table;
        }
    }
?>