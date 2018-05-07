const React = require("react");
const d3Scale = require("d3-scale");

const styles = require("./Dumbbell.scss");

class Dumbbell extends React.Component {
  constructor(props) {
    super(props);

    this.scale = d3Scale
      .scaleLinear()
      .domain([0, this.props.maxValue || 100])
      .range([0, 100]);

    this.state = {};
  }

  getActualPercent(percent) {
    let actualPercent = percent * this.props.percentMultiplier || percent * 1;
    return parseFloat(actualPercent.toFixed(2));
  }

  componentWillReceiveProps(nextProps) {
    this.scale = d3Scale
      .scaleLinear()
      .domain([0, nextProps.maxValue || 100])
      .range([0, 100]);
  }

  render() {
    // Extract vars
    let { dot1Percent, dot2Percent, line1Percent } = this.props;

    // Align the labels
    let dot1Align = "left";
    let dot2Align = "right";

    if (dot1Percent < dot2Percent) {
      dot1Align = "left";
      dot2Align = "right";
    } else {
      dot1Align = "right";
      dot2Align = "left";
    }

    // If too close to the borders flip them
    if (this.scale(dot1Percent) < 6) dot1Align = "right";
    if (this.scale(dot2Percent) < 6) dot2Align = "right";

    if (this.scale(dot1Percent) > 94) dot1Align = "left";
    if (this.scale(dot2Percent) > 94) dot2Align = "left";

    // Modify some styles
    let dot1Style = { left: this.scale(dot1Percent) + "%" };
    let dot2Style = { left: this.scale(dot2Percent) + "%" };
    let dot1PercentStyle = {
      left: "calc(" + this.scale(dot1Percent) + "% - 8px)"
    };
    let dot1PercentRightStyle = {
      left: "calc(" + this.scale(dot1Percent) + "% + 10px)"
    };
    let dot2PercentStyle = {
      left: "calc(" + this.scale(dot2Percent) + "% - 8px)"
    };
    let dot2PercentRightStyle = {
      left: "calc(" + this.scale(dot2Percent) + "% + 10px)"
    };

    // Custom dot colors
    if (this.props.dot1Color) {
      dot1Style.backgroundColor = this.props.dot1Color;
      dot1PercentStyle.color = this.props.dot1Color;
      dot1PercentRightStyle.color = this.props.dot1Color;
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.label}>{this.props.label}</div>
        <div className={styles.chart}>
          <div className={styles.midBar} />
          {line1Percent && (
            <span
              className={styles.line1}
              style={{ left: this.scale(line1Percent) + "%" }}
            />
          )}
          {dot1Percent && <span className={styles.dot1} style={dot1Style} />}
          <span className={styles.dot2} style={dot2Style} />
          {/* Check if we want dot1 labels left or right */}
          {dot1Percent &&
            (dot1Align === "left" ? (
              <span className={styles.dot1Percent} style={dot1PercentStyle}>
                {this.getActualPercent(dot1Percent)}%
              </span>
            ) : (
              <span
                className={styles.dot1PercentRight}
                style={dot1PercentRightStyle}
              >
                {this.getActualPercent(dot1Percent)}%
              </span>
            ))}
          {/* Check if we want dot2 labels left or right */}
          {dot2Align === "left" ? (
            <span className={styles.dot2Percent} style={dot2PercentStyle}>
              {this.getActualPercent(dot2Percent)}%
            </span>
          ) : (
            <span
              className={styles.dot2PercentRight}
              style={dot2PercentRightStyle}
            >
              {this.getActualPercent(dot2Percent)}%
            </span>
          )}
        </div>
      </div>
    );
  }
}

module.exports = Dumbbell;
