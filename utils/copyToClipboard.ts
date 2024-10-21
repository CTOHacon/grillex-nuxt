export const copyToClipboard = (text: string) => {
    if (!navigator.clipboard) {
        // Fallback for older browsers
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'failed';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.error('Fallback clipboard copy failed', err);
        }
        document.body.removeChild(textArea);
    } else {
        // Modern approach using Clipboard API
        navigator.clipboard.writeText(text).then(function () {
            console.log('Copying text to clipboard successful');
        }, function (err) {
            console.error('Failed to copy text to clipboard', err);
        });
    }
}