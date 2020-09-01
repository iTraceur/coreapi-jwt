import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as i0 from "@angular/core";
var GlobalState = /** @class */ (function () {
    function GlobalState() {
        var _this = this;
        this.data = new Subject();
        this.dataStream$ = this.data.asObservable();
        this.subscriptions = new Map();
        this.dataStream$.subscribe(function (data) { return _this.onEvent(data); });
    }
    GlobalState.prototype.publish = function (event, value, force) {
        if (force === void 0) { force = false; }
        var current = this.data[event];
        if (current !== value || force) {
            this.data[event] = value;
            this.data.next({
                event: event,
                data: this.data[event],
            });
        }
    };
    GlobalState.prototype.subscribe = function (event, callback) {
        var subscribers = this.subscriptions.get(event) || [];
        if (subscribers.indexOf(callback) < 0) {
            subscribers.push(callback);
        }
        this.subscriptions.set(event, subscribers);
    };
    GlobalState.prototype.onEvent = function (data) {
        var subscribers = this.subscriptions.get(data['event']) || [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLnN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWNvcmVhcGktcHJveHkvIiwic291cmNlcyI6WyJsaWIvZ2xvYmFsLnN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFFdkM7SUFRRTtRQUFBLGlCQUVDO1FBUE8sU0FBSSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDN0IsZ0JBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXZDLGtCQUFhLEdBQWlDLElBQUksR0FBRyxFQUEyQixDQUFDO1FBR3ZGLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFhO1FBQWIsc0JBQUEsRUFBQSxhQUFhO1FBQ2pDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsSUFBSSxPQUFPLEtBQUssS0FBSyxJQUFJLEtBQUssRUFBRTtZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUV6QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDYixLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDdkIsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsK0JBQVMsR0FBVCxVQUFVLEtBQWEsRUFBRSxRQUFrQjtRQUN6QyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEQsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsSUFBUztRQUNmLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoRSxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTtZQUMzQixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7MEVBcENVLFdBQVc7dURBQVgsV0FBVyxXQUFYLFdBQVc7c0JBSnhCO0NBeUNDLEFBdENELElBc0NDO1NBckNZLFdBQVc7a0RBQVgsV0FBVztjQUR2QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHbG9iYWxTdGF0ZSB7XG5cbiAgcHJpdmF0ZSBkYXRhID0gbmV3IFN1YmplY3Q8T2JqZWN0PigpO1xuICBwcml2YXRlIGRhdGFTdHJlYW0kID0gdGhpcy5kYXRhLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogTWFwPHN0cmluZywgQXJyYXk8RnVuY3Rpb24+PiA9IG5ldyBNYXA8c3RyaW5nLCBBcnJheTxGdW5jdGlvbj4+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kYXRhU3RyZWFtJC5zdWJzY3JpYmUoKGRhdGEpID0+IHRoaXMub25FdmVudChkYXRhKSk7XG4gIH1cblxuICBwdWJsaXNoKGV2ZW50LCB2YWx1ZSwgZm9yY2UgPSBmYWxzZSkge1xuICAgIGNvbnN0IGN1cnJlbnQgPSB0aGlzLmRhdGFbZXZlbnRdO1xuICAgIGlmIChjdXJyZW50ICE9PSB2YWx1ZSB8fCBmb3JjZSkge1xuICAgICAgdGhpcy5kYXRhW2V2ZW50XSA9IHZhbHVlO1xuXG4gICAgICB0aGlzLmRhdGEubmV4dCh7XG4gICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgZGF0YTogdGhpcy5kYXRhW2V2ZW50XSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN1YnNjcmliZShldmVudDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBjb25zdCBzdWJzY3JpYmVycyA9IHRoaXMuc3Vic2NyaXB0aW9ucy5nZXQoZXZlbnQpIHx8IFtdO1xuICAgIGlmIChzdWJzY3JpYmVycy5pbmRleE9mKGNhbGxiYWNrKSA8IDApIHtcbiAgICAgIHN1YnNjcmliZXJzLnB1c2goY2FsbGJhY2spO1xuICAgIH1cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuc2V0KGV2ZW50LCBzdWJzY3JpYmVycyk7XG4gIH1cblxuICBvbkV2ZW50KGRhdGE6IGFueSkge1xuICAgIGNvbnN0IHN1YnNjcmliZXJzID0gdGhpcy5zdWJzY3JpcHRpb25zLmdldChkYXRhWydldmVudCddKSB8fCBbXTtcbiAgICBzdWJzY3JpYmVycy5mb3JFYWNoKChjYWxsYmFjaykgPT4ge1xuICAgICAgY2FsbGJhY2suY2FsbChudWxsLCBkYXRhWydkYXRhJ10pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=