(function() {
  'use strict';

  angular.module('myApp', ['angular-loading-bar', 'dragularModule']);

  angular.module('myApp').controller('Basic', ['$timeout', '$scope', '$element', 'dragularService', function TodoCtrl($timeout, $scope, $element, dragularService) {
    $timeout(function() { // timeount due to nested ngRepeat to be ready
      var container = $element.children().eq(0).children(),
        parentContainers = container.children(),
        nestedContainers = [];

      dragularService(container, {
        moves: function(el, container, handle) {
          return handle.classList.contains('row-handle');
        },
        containersModel: $scope.items
      });

      // collect nested contianers
      for (var i = 0; i < parentContainers.length; i++) {
        nestedContainers.push(parentContainers.eq(i).children()[1]);
      }

      dragularService(nestedContainers, {
        moves: function(el, container, handle) {
          return !handle.classList.contains('row-handle');
        },
        containersModel: (function getNestedContainersModel(){
          var parent = $scope.items,
            containersModel = [];
          for (var i = 0; i < parent.length; i++) {
            containersModel.push(parent[i].items);
          }
          return containersModel;
        })()
      });
    }, 0);
    $scope.items = [{
      items: [{
        content: 'Item a1'
      }, {
        content: 'Item a2'
      }, {
        content: 'Item a3'
      }, {
        content: 'Item a4'
      }]
    }, {
      items: [{
        content: 'Item b1'
      }, {
        content: 'Item b2'
      }, {
        content: 'Item b3'
      }, {
        content: 'Item b4'
      }]
    }, {
      items: [{
        content: 'Item c1'
      }, {
        content: 'Item c2'
      }, {
        content: 'Item c3'
      }, {
        content: 'Item c4'
      }]
    }];
  }]);

})();
