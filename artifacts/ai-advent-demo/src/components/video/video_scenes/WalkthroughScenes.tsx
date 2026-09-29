import { LiveCaptureScene } from './LiveCaptureScene';

export function HomeOpening() {
  return (
    <LiveCaptureScene
      image="home"
      duration={7200}
      opening
      departureScale={1.025}
      cursor={{
        x: { values: ['76%', '76%', '54%', '34.7%', '34.7%'], times: [0, .33, .52, .79, 1] },
        y: { values: ['82%', '82%', '64%', '52.9%', '52.9%'], times: [0, .33, .52, .79, 1] },
        visible: { values: ['0', '0', '1', '1', '1'], times: [0, .29, .34, .89, 1] },
        click: { x: '34.7%', y: '52.9%', at: 6.35 },
      }}
    />
  );
}

export function RagExploration() {
  return (
    <LiveCaptureScene
      image="rag"
      duration={15300}
      scroll={{
        values: ['0%', '0%', '-14%', '-14%', '-41%', '-41%', '0%', '0%'],
        times: [0, .157, .392, .464, .686, .784, .922, 1],
      }}
      cursor={{
        x: { values: ['48%', '48%', '60%', '83.8%', '83.8%'], times: [0, .84, .91, .976, 1] },
        y: { values: ['74%', '74%', '35%', '4.2%', '4.2%'], times: [0, .84, .91, .976, 1] },
        visible: { values: ['0', '0', '1', '1', '1'], times: [0, .855, .875, .99, 1] },
        click: { x: '83.8%', y: '4.2%', at: 14.9 },
      }}
    />
  );
}

export function HomeSecondDoor() {
  return (
    <LiveCaptureScene
      image="home"
      duration={6700}
      departureScale={1.025}
      cursor={{
        x: { values: ['83.8%', '83.8%', '75%', '65.3%', '65.3%'], times: [0, .32, .55, .81, 1] },
        y: { values: ['4.2%', '4.2%', '42%', '78.4%', '78.4%'], times: [0, .32, .55, .81, 1] },
        visible: { values: ['1', '1', '1', '1', '1'], times: [0, .32, .55, .81, 1] },
        click: { x: '65.3%', y: '78.4%', at: 5.9 },
      }}
    />
  );
}

export function EvalsExploration() {
  return (
    <LiveCaptureScene
      image="evals"
      duration={5800}
      scroll={{
        values: ['0%', '0%', '-14%', '-14%', '0%', '0%'],
        times: [0, .31, .71, .82, .92, 1],
      }}
      cursor={{
        x: { values: ['49%', '49%', '83.8%', '83.8%'], times: [0, .78, .95, 1] },
        y: { values: ['70%', '70%', '4.2%', '4.2%'], times: [0, .78, .95, 1] },
        visible: { values: ['0', '0', '1', '1'], times: [0, .78, .81, 1] },
        click: { x: '83.8%', y: '4.2%', at: 5.5 },
      }}
    />
  );
}

export function HomeFinale() {
  return <LiveCaptureScene image="home" duration={5000} />;
}