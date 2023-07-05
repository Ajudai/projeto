import styles from './requestHelp.module.scss';
import { useState } from 'react';
import { PiMountainsFill } from 'react-icons/pi';
import Button from '../../components/button/Button';
import Header from '../../components/header/Header';
import { Select } from '@chakra-ui/react';

const RequestHelp = () => {
  const [titulo, setTitulo] = useState('');
  const [contato, setContato] = useState('');
  const [descricao, setDescricao] = useState('');

  return (
    <main className={styles.requestHelpPageMain}>
      <Header />

      <div className={styles.requestHelpHomeRequest}>
        <h1 className={styles.requestHelpHomeMenuH1}>Peça uma Ajudaí</h1>
        <div className={styles.requestHelpHomeMenuBanner}>
          <input type="file" className={styles.requestHelpHomeMenuBannerInput} />
          <PiMountainsFill color="#000" size={40} />
          <p className={styles.requestHelpHomeMenuBannerP}>Insira uma foto para banner</p>
        </div>
      </div>

      <div className={styles.requestHelpHomeCategories}>
        <h2 className={styles.requestHelpHomeCategoriesH2}>Categorias</h2>
        <div className={styles.requestHelpHomeCategoriesContainer}>
          <Select placeholder="Escolha uma categoria">
            <option value="Comida">Comida</option>
            <option value="Roupas">Roupas</option>
            <option value="Educação">Educação</option>
            <option value="Brinquedos">Brinquedos</option>
            <option value="Outros">Outros</option>
          </Select>
        </div>
      </div>

      <div className={styles.requestHelpHomeDescription}>
        <h3 className={styles.requestHelpHomeMenuH3}>Título</h3>
        <input className={styles.requestInput} placeholder="Título" onChange={(e) => setTitulo(e.target.value)} />
      </div>

      <div className={styles.requestHelpHomeDescription}>
        <h3 className={styles.requestHelpHomeMenuH3}>Contato</h3>
        <input
          className={styles.requestInput}
          placeholder="(DDD)987654321"
          onChange={(e) => setContato(e.target.value)}
        />
      </div>

      <div className={styles.requestHelpHomeDescription}>
        <h3 className={styles.requestHelpHomeMenuH3}>Descrição</h3>
        <textarea
          className={styles.requestHelpHomeTextArea}
          rows={4}
          placeholder="Introduza uma breve descrição aqui..."
          onChange={(e) => setDescricao(e.target.value)}
        />

        <div className={styles.requestHelpHomeButton}>
          <Button size="medium" rounded disabled={false} onClick={() => console.log('Publicado')} label="Salvar" />
        </div>
      </div>
    </main>
  );
};

export default RequestHelp;
