import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
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
        if (subscribers.indexOf(callback) < 0) {
            subscribers.push(callback);
        }
        this._subscriptions.set(event, subscribers);
    };
    GlobalState.prototype._onEvent = function (data) {
        var subscribers = this._subscriptions.get(data['event']) || [];
        console.log(subscribers);
        subscribers.forEach(function (callback) {
            callback.call(null, data['data']);
        });
    };
    GlobalState = __decorate([
        Injectable()
    ], GlobalState);
    return GlobalState;
}());
export { GlobalState };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLnN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY29yZWFwaS1wcm94eS8iLCJzb3VyY2VzIjpbImxpYi9nbG9iYWwuc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUd2QztJQU9FO1FBQUEsaUJBRUM7UUFQTyxVQUFLLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUM5QixpQkFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFekMsbUJBQWMsR0FBaUMsSUFBSSxHQUFHLEVBQTJCLENBQUM7UUFHeEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFuQixDQUFtQixDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELHVDQUFpQixHQUFqQixVQUFrQixLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQWE7UUFBYixzQkFBQSxFQUFBLGFBQWE7UUFDM0MsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLE9BQU8sS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFO1lBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBRTFCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNkLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUN4QixDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCwrQkFBUyxHQUFULFVBQVUsS0FBYSxFQUFFLFFBQWtCO1FBQ3pDLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6RCxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELDhCQUFRLEdBQVIsVUFBUyxJQUFTO1FBQ2hCLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pCLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO1lBQzNCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXJDVSxXQUFXO1FBRHZCLFVBQVUsRUFBRTtPQUNBLFdBQVcsQ0FzQ3ZCO0lBQUQsa0JBQUM7Q0FBQSxBQXRDRCxJQXNDQztTQXRDWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHbG9iYWxTdGF0ZSB7XG5cbiAgcHJpdmF0ZSBfZGF0YSA9IG5ldyBTdWJqZWN0PE9iamVjdD4oKTtcbiAgcHJpdmF0ZSBfZGF0YVN0cmVhbSQgPSB0aGlzLl9kYXRhLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IE1hcDxzdHJpbmcsIEFycmF5PEZ1bmN0aW9uPj4gPSBuZXcgTWFwPHN0cmluZywgQXJyYXk8RnVuY3Rpb24+PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2RhdGFTdHJlYW0kLnN1YnNjcmliZSgoZGF0YSkgPT4gdGhpcy5fb25FdmVudChkYXRhKSk7XG4gIH1cblxuICBub3RpZnlEYXRhQ2hhbmdlZChldmVudCwgdmFsdWUsIGZvcmNlID0gZmFsc2UpIHtcbiAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5fZGF0YVtldmVudF07XG4gICAgaWYgKGN1cnJlbnQgIT09IHZhbHVlIHx8IGZvcmNlKSB7XG4gICAgICB0aGlzLl9kYXRhW2V2ZW50XSA9IHZhbHVlO1xuXG4gICAgICB0aGlzLl9kYXRhLm5leHQoe1xuICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgIGRhdGE6IHRoaXMuX2RhdGFbZXZlbnRdLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc3Vic2NyaWJlKGV2ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGNvbnN0IHN1YnNjcmliZXJzID0gdGhpcy5fc3Vic2NyaXB0aW9ucy5nZXQoZXZlbnQpIHx8IFtdO1xuICAgIGlmIChzdWJzY3JpYmVycy5pbmRleE9mKGNhbGxiYWNrKSA8IDApIHtcbiAgICAgIHN1YnNjcmliZXJzLnB1c2goY2FsbGJhY2spO1xuICAgIH1cbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnNldChldmVudCwgc3Vic2NyaWJlcnMpO1xuICB9XG5cbiAgX29uRXZlbnQoZGF0YTogYW55KSB7XG4gICAgY29uc3Qgc3Vic2NyaWJlcnMgPSB0aGlzLl9zdWJzY3JpcHRpb25zLmdldChkYXRhWydldmVudCddKSB8fCBbXTtcbiAgICBjb25zb2xlLmxvZyhzdWJzY3JpYmVycyk7XG4gICAgc3Vic2NyaWJlcnMuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgIGNhbGxiYWNrLmNhbGwobnVsbCwgZGF0YVsnZGF0YSddKTtcbiAgICB9KTtcbiAgfVxufVxuIl19