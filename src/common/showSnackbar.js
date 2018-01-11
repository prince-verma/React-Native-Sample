import {showSnackBar} from '@prince8verma/react-native-snackbar';

export default function displaySnackbar(message, confirmText, onConfirm) {
  if (message) {
    showSnackBar({
      message,
      textColor: '#46407B',
      position: 'top',
      onConfirm: confirmText && onConfirm,
      confirmText: onConfirm && confirmText ? confirmText : '',
      buttonColor: '#46407B',
      duration: 4000,
      animationTime: 250,
      backgroundColor: "#FFF",
    });
  }
}
