var Tiles = function ($scope, $http)
{
    // Public property container
    var publicVars;

    // Public functions
    var activate;
    var deactivate;

    // Public member variables
    var timeRemainingModel = {val : 0};
    var colsModel = {};

    // Private member variables
    var timerTickId;
    var gridRefreshId;
    var timerId;
    var maxTime;


    // Call to initialize object
    activate = function()
    {
        maxTime = 30;
        timeRemainingModel.val = maxTime;
        timerTickId = setInterval(timerTick, 1000);
        gridRefreshId = setInterval(gridRefresh, 500);
    };

    // Call to deconstruct object
    deactivate = function()
    {
        stopTimers();
    };

    function timerTick()
    {
        timeRemainingModel.val--;

        if(timeRemainingModel.val < 0)
        {
            timeRemainingModel.val = maxTime;
        }
        $scope.$apply();
    }

    function gridRefresh()
    {
        $http.get('grid.json').success(function(data) {
            $scope.cols = data.cols;
            //colsModel = data.cols;
            //$scope.$apply();
        });
    }

    function stopTimers()
    {
        clearInterval(timerTickId);
        clearInterval(gridRefreshId);
    }

    publicVars = {
        activate : activate,
        deactivate : deactivate,
        timeRemainingModel : timeRemainingModel,
        colsModel : colsModel
    };

    return publicVars;
};

function TilesController($scope, $http)
{
    // Controller
    var tiles = new Tiles($scope, $http);
    tiles.activate();

    // Model
    /*
    $http.get('grid.json').success(function(data) {
        $scope.cols = data.cols;
    });
    */
    $scope.cols = tiles.colsModel;
    $scope.timeRemaining = tiles.timeRemainingModel;
}