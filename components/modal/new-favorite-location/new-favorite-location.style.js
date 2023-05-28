import { StyleSheet } from 'react-native';
import mainStyles from '../../../styles/main.style';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
    textAlign: "center",
    color: '#FF5A5F',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  button: {
    flex: 1,
    borderRadius: 5,
    paddingVertical: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    backgroundColor: '#FF5A5F',
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  buttonText: mainStyles.buttonText,
});

export default styles;