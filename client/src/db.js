import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  contacts: '++id, name, age', // Primary key and indexed props
});

export function AddContact() {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
  
    async function addFriend() {
      try {
        // Add the new contact!
        const id = await db.contacts.add({
          name,
          number
        });
  
        setName(`Contact ${name} successfully added. Got id ${id}`);
        setNumber("");
      } catch (error) {
        setName(`Failed to add ${name}: ${error}`);
      }
    }
  
    return <>
      <p>
        {number}
      </p>
      Name:
      <input
        type="text"
        value={name}
        onChange={ev => setName(ev.target.value)}
      />
      Age:
      <input
        type="number"
        value={age}
        onChange={ev => setAge(Number(ev.target.value))}
      />
      
      <button onClick={addFriend}>
        Add
      </button>
    </>
  }

  //Get all contact
  export function ContactList() {
    const contacts = useLiveQuery(
      () => db.contacts.toArray()
    );
  
    return <ul>
      {contacts?.map(contact => <li key={contacts.id}>
        {contacts.name}, {contacts.number}
      </li>)}
    </ul>;
  }

  export const App = () => <>

  <h1>My simple Dexie app</h1>

  <h2>Add Contact</h2>
  <AddFriendForm />

  <h2>Contact List</h2>
  <FriendList />

</>;
