import classNames from 'classnames';
import styles from './PlaybackSettings.styl';

export default class PlaybackSettings extends React.Component {

    static displayName = 'PlaybackSettings';

    static propTypes = {
        isShuffle: React.PropTypes.bool.isRequired,
        loopMode: React.PropTypes.string.isRequired,
        volume: React.PropTypes.number.isRequired,
        volumeMin: React.PropTypes.number.isRequired,
        volumeMax: React.PropTypes.number.isRequired,
        volumeStep: React.PropTypes.number.isRequired,

        onShuffleClick: React.PropTypes.func.isRequired,
        onLoopClick: React.PropTypes.func.isRequired,
        onVolumeMinusMouseDown: React.PropTypes.func.isRequired,
        onVolumeMinusMouseUp: React.PropTypes.func.isRequired,
        onVolumePlusMouseDown: React.PropTypes.func.isRequired,
        onVolumePlusMouseUp: React.PropTypes.func.isRequired,
        onVolumeRangeInput: React.PropTypes.func.isRequired
    };

    _renderLoopButton() {
        const { loopMode, onLoopClick } = this.props;
        const className = classNames('js-repeat-button', {
            [styles.repeat]: loopMode === 'off',
            [styles.repeatActive]: loopMode !== 'off'
        });

        return (
            <span className={className} onClick={onLoopClick}>
                <i className="material-icons">{loopMode === 'one' ? 'repeat_one' : 'repeat'}</i>
            </span>
        );
    }

    render() {
        const {
            isShuffle,
            onShuffleClick,
            volume,
            volumeMin,
            volumeMax,
            volumeStep,
            onVolumePlusMouseDown,
            onVolumePlusMouseUp,
            onVolumeMinusMouseDown,
            onVolumeMinusMouseUp,
            onVolumeRangeInput
        } = this.props;
        const shuffleClass = classNames('js-shuffle-button', {
            [styles.shuffle]: !isShuffle,
            [styles.shuffleActive]: isShuffle
        });
        const volumeRangeStyle = {
            backgroundSize: `${volume * 100}% 100%`
        };

        return (
            <div className={styles.wrap}>
                {this._renderLoopButton()}
                <span className="separate"></span>
                <span className={shuffleClass} onClick={onShuffleClick}>
                    <i className="material-icons">shuffle</i>
                </span>
                <span className="separate"></span>
                <div className={styles.volume}>
                    <span
                        className={classNames('js-volume-minus', styles.volumeButton)}
                        onMouseDown={onVolumeMinusMouseDown}
                        onMouseUp={onVolumeMinusMouseUp}
                    >
                        –
                    </span>
                    <label className={styles.volumeRangeWrap}>
                        <input
                            className={styles.volumeRange}
                            type="range"
                            tabIndex="-1"
                            min={volumeMin}
                            max={volumeMax}
                            step={volumeStep}
                            onInput={onVolumeRangeInput}
                            value={volume}
                            style={volumeRangeStyle}
                        />
                    </label>
                    <span
                        className={classNames('js-volume-plus', styles.volumeButton)}
                        onMouseDown={onVolumePlusMouseDown}
                        onMouseUp={onVolumePlusMouseUp}
                    >
                        +
                    </span>
                </div>
                <span className="separate"></span>
            </div>
        );
    }

}
