import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as i0 from "@angular/core";
var GlobalState = /** @class */ (function () {
    function GlobalState() {
        var _this = this;
        this._data = new Subject();
        this._dataStream$ = this._data.asObservable();
        this._subscriptions = new Map();
        this._dataStream$.subscribe(function (data) { return _this._onEvent(data); });
    }
    GlobalState.prototype.notifyDataChanged = function (event, value, force) {
        if (force === void 0) { force = false; }
        var current = this._data[event];
        if (current !== value || force) {
            this._data[event] = value;
            this._data.next({
                event: event,
                data: this._data[event],
            });
        }
    };
    GlobalState.prototype.subscribe = function (event, callback) {
        var subscribers = this._subscriptions.get(event) || [];
        subscribers.push(callback);
        this._subscriptions.set(event, subscribers);
    };
    GlobalState.prototype._onEvent = function (data) {
        var subscribers = this._subscriptions.get(data['event']) || [];
        subscribers.forEach(function (callback) {
            callback.call(null, data['data']);
        });
    };
    GlobalState.ɵfac = function GlobalState_Factory(t) { return new (t || GlobalState)(); };
    GlobalState.ɵprov = i0.ɵɵdefineInjectable({ token: GlobalState, factory: GlobalState.ɵfac });
    return GlobalState;
}());
export { GlobalState };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(GlobalState, [{
        type: Injectable
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLnN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY29yZWFwaS1wcm94eS8iLCJzb3VyY2VzIjpbImxpYi9nbG9iYWwuc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDOztBQUV2QztJQVFFO1FBQUEsaUJBRUM7UUFQTyxVQUFLLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUM5QixpQkFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFekMsbUJBQWMsR0FBaUMsSUFBSSxHQUFHLEVBQTJCLENBQUM7UUFHeEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFuQixDQUFtQixDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELHVDQUFpQixHQUFqQixVQUFrQixLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQWE7UUFBYixzQkFBQSxFQUFBLGFBQWE7UUFDM0MsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLE9BQU8sS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFO1lBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBRTFCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNkLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUN4QixDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCwrQkFBUyxHQUFULFVBQVUsS0FBYSxFQUFFLFFBQWtCO1FBQ3pDLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6RCxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTNCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLElBQVM7UUFDaEIsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWpFLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO1lBQzNCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzswRUFwQ1UsV0FBVzt1REFBWCxXQUFXLFdBQVgsV0FBVztzQkFKeEI7Q0F5Q0MsQUF0Q0QsSUFzQ0M7U0FyQ1ksV0FBVztrREFBWCxXQUFXO2NBRHZCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdsb2JhbFN0YXRlIHtcblxuICBwcml2YXRlIF9kYXRhID0gbmV3IFN1YmplY3Q8T2JqZWN0PigpO1xuICBwcml2YXRlIF9kYXRhU3RyZWFtJCA9IHRoaXMuX2RhdGEuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uczogTWFwPHN0cmluZywgQXJyYXk8RnVuY3Rpb24+PiA9IG5ldyBNYXA8c3RyaW5nLCBBcnJheTxGdW5jdGlvbj4+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fZGF0YVN0cmVhbSQuc3Vic2NyaWJlKChkYXRhKSA9PiB0aGlzLl9vbkV2ZW50KGRhdGEpKTtcbiAgfVxuXG4gIG5vdGlmeURhdGFDaGFuZ2VkKGV2ZW50LCB2YWx1ZSwgZm9yY2UgPSBmYWxzZSkge1xuICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLl9kYXRhW2V2ZW50XTtcbiAgICBpZiAoY3VycmVudCAhPT0gdmFsdWUgfHwgZm9yY2UpIHtcbiAgICAgIHRoaXMuX2RhdGFbZXZlbnRdID0gdmFsdWU7XG5cbiAgICAgIHRoaXMuX2RhdGEubmV4dCh7XG4gICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgZGF0YTogdGhpcy5fZGF0YVtldmVudF0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzdWJzY3JpYmUoZXZlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgY29uc3Qgc3Vic2NyaWJlcnMgPSB0aGlzLl9zdWJzY3JpcHRpb25zLmdldChldmVudCkgfHwgW107XG4gICAgc3Vic2NyaWJlcnMucHVzaChjYWxsYmFjayk7XG5cbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnNldChldmVudCwgc3Vic2NyaWJlcnMpO1xuICB9XG5cbiAgX29uRXZlbnQoZGF0YTogYW55KSB7XG4gICAgY29uc3Qgc3Vic2NyaWJlcnMgPSB0aGlzLl9zdWJzY3JpcHRpb25zLmdldChkYXRhWydldmVudCddKSB8fCBbXTtcblxuICAgIHN1YnNjcmliZXJzLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICBjYWxsYmFjay5jYWxsKG51bGwsIGRhdGFbJ2RhdGEnXSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==