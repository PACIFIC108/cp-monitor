const HandleVerdict = ({ latestVerdict, submissionId }) => (
  <div id="verdictDisplay">
    Latest Verdict: {latestVerdict}
    {submissionId ? <span className="block text-xs text-gray-500">Submission #{submissionId}</span> : null}
  </div>
);

export default HandleVerdict;
