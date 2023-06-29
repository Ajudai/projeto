import styles from './helpRequest.module.scss';
import logo from '../../assets/logo.svg';
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { PiMountainsFill } from 'react-icons/pi';
import Button from '../../components/button/Button';

const HelpRequest = (async) => {
  const [descricao, setDescricao] = useState('');

  return (
    <main className={styles.helpRequestPageMain}>
      <div className={styles.helpRequestPage}>
        <header className={styles.helpRequestPageHeader}>
          <div className={styles.helpRequestPageHeaderDiv}>
            <img src={logo} alt="Ajudaí logo" className={styles.helpRequestPageLogoImg} />
            <HiMenu className={styles.helpRequestPageMenu} color="#fff" size={24} />
          </div>
        </header>

        <section className={styles.helpRequestHomeRequest}>
          <h1 className={styles.helpRequestHomeMenuH1}>Peça uma Ajudaí</h1>
          <div className={styles.helpRequestHomeMenuBanner}>
            <input type="file" className={styles.helpRequestHomeMenuBannerInput} />
            <PiMountainsFill className={styles.forgetPasswordPageDesktopArrow} color="#000" size={40} />
            <p className={styles.helpRequestHomeMenuBannerP}>Insira uma foto para banner</p>
          </div>
        </section>

        <section className={styles.helpRequestHomeCategories}>
          <h2 className={styles.helpRequestHomeCategoriesH2}>Categorias</h2>
          <div className={styles.helpRequestHomeCategoriesContainer}>
            <div className={styles.helpRequestHomeCategoriesDiv}>
              <input
                className={styles.helpRequestHomeCategoriesInput}
                type="radio"
                name="categoria"
                value="alimentação"
              />
              Alimentação
            </div>
            <div className={styles.helpRequestHomeCategoriesDiv}>
              <input
                className={styles.helpRequestHomeCategoriesInput}
                type="radio"
                name="categoria"
                value="vestuário"
              />
              Vestuário
            </div>
            <div className={styles.helpRequestHomeCategoriesDiv}>
              <input className={styles.helpRequestHomeCategoriesInput} type="radio" name="categoria" value="educação" />
              Educação
            </div>
            <div className={styles.helpRequestHomeCategoriesDiv}>
              <input
                className={styles.helpRequestHomeCategoriesInput}
                type="radio"
                name="categoria"
                value="brinquedos"
              />
              Brinquedos
            </div>
            <div className={styles.helpRequestHomeCategoriesDiv}>
              <input className={styles.helpRequestHomeCategoriesInput} type="radio" name="categoria" value="outros" />
              Outros
            </div>
          </div>
        </section>

        <section className={styles.helpRequestHomeDescription}>
          <h3 className={styles.helpRequestHomeMenuH3}>Descrição</h3>
          <textarea
            className={styles.helpRequestHomeTextArea}
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

export default HelpRequest;
