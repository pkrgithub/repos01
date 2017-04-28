<?php
/*客户端提供对应页面数*/
    header('Content-Type:application/json');
    $output=[];
    @$start=$_REQUEST['start'];//获取页面数�
    $count=3;//最多获取8条记录�����
    if(empty($start)){
         $start=0;
    }
    $conn=mysqli_connect('127.0.0.1','root','','Ghost','3306');
    $sql='SET NAMES utf8';
    mysqli_query($conn,$sql);
    $sql="SELECT * FROM ghost_article LIMIT $start,$count";
    $result=mysqli_query($conn,$sql);
    while(($row=mysqli_fetch_assoc($result))!==NULL){
        $output[]=$row;
    }
    echo json_encode($output);
?>