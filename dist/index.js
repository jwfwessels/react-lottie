'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _bodymovin = require('bodymovin');

var _bodymovin2 = _interopRequireDefault(_bodymovin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Lottie = function (_React$Component) {
  (0, _inherits3.default)(Lottie, _React$Component);

  function Lottie() {
    (0, _classCallCheck3.default)(this, Lottie);
    return (0, _possibleConstructorReturn3.default)(this, (Lottie.__proto__ || (0, _getPrototypeOf2.default)(Lottie)).apply(this, arguments));
  }

  (0, _createClass3.default)(Lottie, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          width = _props.width,
          height = _props.height;

      var lottieStyles = {
        width: width ? width + 'px' : '100%',
        height: height ? height + 'px' : '100%',
        overflow: 'hidden',
        margin: '0 auto'
      };

      return _react2.default.createElement('div', { ref: 'lavContainer', style: lottieStyles });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.options = {
        container: this.refs.lavContainer,
        renderer: 'svg',
        loop: this.props.options.loop !== false,
        autoplay: this.props.options.autoplay !== false,
        animationData: this.props.options.animationData,
        rendererSettings: this.props.options.rendererSettings
      };

      this.anim = _bodymovin2.default.loadAnimation(this.options);
      this.registerEvents(this.props.eventListeners);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      /* Recreate the animation handle if the data is changed */
      if (this.options.animationData !== nextProps.options.animationData) {
        this.deregisterEvents(this.props.eventListeners);
        this.destroy();
        this.options.animationData = nextProps.options.animationData;
        this.anim = _bodymovin2.default.loadAnimation(this.options);
        this.registerEvents(nextProps.eventListeners);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.props.isStopped ? this.stop() : this.play();
      this.pause();
      this.setSpeed();
      this.setDirection();
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (this.props.isPaused && !this.anim.isPaused) {
        this.anim.pause();
      } else if (!this.props.isPaused && this.anim.isPaused) {
        this.anim.pause();
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.anim.stop();
    }
  }, {
    key: 'play',
    value: function play() {
      this.anim.play();
    }
  }, {
    key: 'setSpeed',
    value: function setSpeed() {
      this.anim.setSpeed(this.props.speed);
    }
  }, {
    key: 'setDirection',
    value: function setDirection() {
      this.anim.setDirection(this.props.direction);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.anim.destroy();
    }
  }, {
    key: 'registerEvents',
    value: function registerEvents(eventListeners) {
      var _this2 = this;

      eventListeners.forEach(function (eventListener) {
        _this2.anim.addEventListener(eventListener.eventName, eventListener.callback);
      });
    }
  }, {
    key: 'deregisterEvents',
    value: function deregisterEvents(eventListeners) {
      var _this3 = this;

      eventListeners.forEach(function (eventListener) {
        _this3.anim.removeEventListener(eventListener.eventName, eventListener.callback);
      });
    }
  }]);
  return Lottie;
}(_react2.default.Component);

exports.default = Lottie;


Lottie.propTypes = {
  eventListeners: _propTypes2.default.arrayOf(_propTypes2.default.object),
  options: _propTypes2.default.object.isRequired,
  height: _propTypes2.default.number,
  width: _propTypes2.default.number,
  isStopped: _propTypes2.default.bool,
  isPaused: _propTypes2.default.bool,
  speed: _propTypes2.default.number,
  direction: _propTypes2.default.number
};

Lottie.defaultProps = {
  eventListeners: [],
  isStopped: false,
  isPaused: false,
  speed: 1
};