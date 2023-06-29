import styles from './requestHelp.module.scss';
import logo from '../../assets/logo.svg';
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { PiMountainsFill } from 'react-icons/pi';
import Button from '../../components/button/Button';

const RequestHelp = (async) => {
  const [descricao, setDescricao] = useState('');

  return (
    <main className={styles.requestHelpPageMain}>
      <div className={styles.requestHelpPage}>
        <header className={styles.requestHelpPageHeader}>
          <div className={styles.requestHelpPageHeaderDiv}>
            <img src={logo} alt="Ajudaí logo" className={styles.requestHelpPageLogoImg} />
            <HiMenu className={styles.requestHelpPageMenu} color="#fff" size={24} />
          </div>
        </header>

        <section className={styles.requestHelpHomeRequest}>
          <h1 className={styles.requestHelpHomeMenuH1}>Peça uma Ajudaí</h1>
          <div className={styles.requestHelpHomeMenuBanner}>
            <input type="file" className={styles.requestHelpHomeMenuBannerInput} />
            <PiMountainsFill className={styles.requestHelpPageDesktopArrow} color="#000" size={40} />
            <p className={styles.requestHelpHomeMenuBannerP}>Insira uma foto para banner</p>
          </div>
        </section>

        <section className={styles.requestHelpHomeCategories}>
          <h2 className={styles.requestHelpHomeCategoriesH2}>Categorias</h2>
          <div className={styles.requestHelpHomeCategoriesContainer}>
            <div className={styles.requestHelpHomeCategoriesDiv}>
              <input
                className={styles.requestHelpHomeCategoriesInput}
                type="radio"
                name="categoria"
                value="alimentação"
              />
              Alimentação
            </div>
            <div className={styles.requestHelpHomeCategoriesDiv}>
              <input className={styles.requestHelpHomeCategoriesInput} type="radio" name="categoria" value="roupas" />
              Roupas
            </div>
            <div className={styles.requestHelpHomeCategoriesDiv}>
              <input className={styles.requestHelpHomeCategoriesInput} type="radio" name="categoria" value="educação" />
              Educação
            </div>
            <div className={styles.requestHelpHomeCategoriesDiv}>
              <input
                className={styles.requestHelpHomeCategoriesInput}
                type="radio"
                name="categoria"
                value="brinquedos"
              />
              Brinquedos
            </div>
            <div className={styles.requestHelpHomeCategoriesDiv}>
              <input className={styles.requestHelpHomeCategoriesInput} type="radio" name="categoria" value="outros" />
              Outros
            </div>
          </div>
        </section>

        <section className={styles.requestHelpHomeDescription}>
          <h3 className={styles.requestHelpHomeMenuH3}>Descrição</h3>
          <textarea
            className={styles.requestHelpHomeTextArea}
            rows={4}
            maxLength={399}
            placeholder="Introduza uma breve descrição aqui..."
            onChange={(e) => setDescricao(e.target.value)}
          />
          <div className={styles.requestHelpHomeButton}>
            <Button size="medium" rounded disabled={false} onClick={() => console.log('Publicado')} label="Salvar" />
          </div>
        </section>
      </div>
    </main>
  );
};

export default RequestHelp;
