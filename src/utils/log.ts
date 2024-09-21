const log = (...items: unknown[]) => {
  console.log(Date.now(), ...items);
};

export default log;
