<?php
    header('Content-Type:application/json');
    $output=[];
    $count=15;//一次最多返回15条记录
    @$start=$_REQUEST['start'];
    if(empty($start)){
         $start=0;
    };
    $conn=mysqli_connect('127.0.0.1','root','','jd','3306');
    $sql='SET NAMES utf8';
    mysqli_query($conn,$sql);
    $sql="SELECT * FROM jd_seckill LIMIT $start,$count";
    $result=mysqli_query($conn,$sql);
    while(($row=mysqli_fetch_assoc($result))!==NULL){
        $output[]=$row;
    };
    echo json_encode($output);
?>