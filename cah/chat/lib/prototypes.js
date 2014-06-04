Object.defineProperty(Array.prototype, "remove", {
    enumerable: false,
    value: function (item) {
        var removeCounter = 0;

        for (i = 0; i < this.length; i++) {
            if (this[i] === item) {
                this.splice(i, 1);
                removeCounter++;
                i--;
            }
        }

        return removeCounter;
    }
});