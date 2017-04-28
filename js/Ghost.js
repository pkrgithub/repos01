/**
 * Created by Administrator on 2017/4/17 0017.
 */
angular.module('module',['ng']).
    controller('constructor',function($scope,$http){
        $http.get('data/ghost.php?start=0').
            success(function(data){
                $scope.dishLish=data;
                $scope.labelLish=[];
                $(data).each(function(idx,ele){
                    var d=ele.label.split(',');
                    $scope.labelLish[ele.id]=d;
                })
            });
        $scope.page=function(){
            var start=($('#page-num').text()-1)*3;
            $http.get('data/ghost.php?start='+start).
                success(function(data){
                    $scope.dishLish=data;
                    $scope.labelLish=[];
                    $(data).each(function(idx,ele){
                        var d=ele.label.split(',');
                        $scope.labelLish[ele.id]=d;
                    })
                });
            //console.log(start)
        }
    });