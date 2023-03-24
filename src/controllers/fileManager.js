import fs from "fs";

export default class FileManager {
  constructor(archivo) {
    this.archivo = archivo;
  }

  exists(archivo) {
    /* verifico si existe el archivo */
    try {
      if (!fs.existsSync(archivo)) {
        throw new Error("El archivo no existe");
      } else {
        return true;
      }
    } catch (error) {
      console.log(`Error buscando el archivo: ${error.message}`);
    }
  }

  async readFile(archivo) {
    try {
      /* leo el archivo */
      const data = await fs.readFileSync(archivo);
      return JSON.parse(data);
    } catch (error) {
      console.log(`Error leyendo el archivo: ${error.message}`);
    }
  }

  async writeFile(data) {
    try {
      await fs.writeFileSync(this.archivo, JSON.stringify(data, null, 2));
    } catch (error) {
      console.log(`Error escribiendo el archivo: ${error.message}`);
    }
  }
}
