import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: '#FF5A5F',
    fontSize: 20,
    fontWeight: 'bold',
    verticalAlign: "middle"
  },
  button: {
    backgroundColor: '#FF5A5F',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginLeft: '10%',
    marginRight: '10%',
  },
});

export default styles;