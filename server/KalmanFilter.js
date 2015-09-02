/**
 * Created by isaacherrera on 9/1/15.
 */

var KalmanFilter = (function () {
    "use strict";

    //public static double KALMAN_VALUE = 2D;
    var KALMAN_VALUE = 2.0;
    //private static final Map<String, Double> mPredictedSignals = new HashMap<String, Double>();
    var mPredictedSignals = {};
    //private static final Map<String, Double> mPredictedVelocities = new HashMap<String, Double>();
    var mPredictedVelocities = {};

    var filter = function (newSignalValue, identifier) {
        var predictedSignal = mPredictedSignals[identifier];
        if (predictedSignal == null) {
            predictedSignal = -70.0;//-70D;
        }

        var predictedVelocity = mPredictedVelocities[identifier];
        if (predictedVelocity == null) {
            predictedVelocity = 1.0;//1D;
        }

        var k = predictedVelocity / (predictedVelocity + KALMAN_VALUE);

        var measuredSignal = predictedSignal + k * (newSignalValue - predictedSignal);
        mPredictedSignals[identifier] = measuredSignal;

        var measuredVelocity = (1 - k) * predictedVelocity;
        mPredictedVelocities[identifier] = measuredVelocity;

        return measuredSignal;
    };
    return {
        filter: filter
    };
}());

module.exports = KalmanFilter;