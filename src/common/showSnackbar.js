import {showSnackBar} from '@prince8verma/react-native-snackbar';

export default function displaySnackbar(message, confirmText, onConfirm) {
  if (message) {
    showSnackBar({
      message,
      textColor: '#FFF',
      position: 'bottom',
      onConfirm: confirmText && onConfirm,
      confirmText: onConfirm && confirmText ? confirmText : '',
      buttonColor: '#03a9f4',
      duration: 4000,
      animationTime: 250,
      backgroundColor: "#323232",
    });
  }
}
