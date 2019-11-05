(function() {
    'use strict';

    describe('directive.sort', function () {
        beforeEach(module('directive'));

        var sort,
            $scope;

        beforeEach(inject(function ($rootScope, $compile) {
            $scope = $rootScope;
            sort = $compile('<sort type="id"></sort>')($scope);
            $scope.$digest();

        }));

        it('should render default inactive image', function () {
            expect(sort.find('img').attr('src')).toBe('img/sortInactive.png');
        });

        it('should render active asc image', function () {
            $scope.vm = {orderBy: 'id'};
            $scope.$digest();
            expect(sort.find('img').attr('src')).toBe('img/sortActiveAsc.png');
        });

        it('should render active asc image', function () {
            $scope.vm = {orderBy: '-id'};
            $scope.$digest();
            expect(sort.find('img').attr('src')).toBe('img/sortActiveDesc.png');
        });

    });
})();
