import React from 'react';
import { Panel } from 'rsuite';
import '../../styles/Card.css';
import toast from 'react-hot-toast';
import Image from "next/image"

class Card extends React.Component {
    
    render() {
        const {content, nome, data_pub, data_jul, initials, name, url, arrId, toggleLike, voteData} = this.props

        return (
            <Panel
                className="turivius-card"
                shaded
                bordered
            >
                <div className="card-header">
                    <p className="card-h1">{name} - {initials}</p>
                    <p className="card-h2">{nome}</p>
                </div>
                
                <div className="datas">
                    <p>{data_pub}</p>
                    <p>{data_jul}</p>
                </div>
                {content.map((c, id) => // id = index 
                    <div className="content" key={id}>
                        <div className="content-btn">
                            {c.title === 'Ementa' ?
                                <a className="btn-pdf" href={url} target="_blank" rel="noreferrer">
                                    <Image width="60px" height="70px" src='/pdf.png' alt='pdf'/>
                                </a>
                            : null} 
                            {c.title === 'Ementa'  ? <button className="btn" onClick={() => (navigator.clipboard.writeText(`Ementa: ${content[0].content}\r\n\r\nDecisão: ${content[1].content}`), toast.success('Copied'))} >Copiar </button> : null}

                        </div>
                        <p className="content-text" key={c.title}>
                            <b className="content-title">{c.title}:</b> {c.content}
                        </p>
                    </div>   
                )}
                
                <div className="btn-likes">
                    {!voteData[arrId]?.vote || voteData[arrId]?.vote ==='dislike' ? 
                        <button className={`btn--like ${voteData[arrId]?.vote === 'like' ? 'active' : null}`} onClick={() => toggleLike(arrId, 'like')}><i className="fas fa-thumbs-up fa-2x"></i></button>
                          //remover like
                        : voteData[arrId]?.vote === 'like' ?
                        <button className={`btn--like ${voteData[arrId]?.vote === 'like' ? 'active' : null}`} onClick={() => toggleLike(arrId, '')}><i className="fas fa-thumbs-up fa-2x"></i></button>
                    : null}

                    {!voteData[arrId]?.vote || voteData[arrId]?.vote==='like' ? 
                        <button className={`btn--like ${voteData[arrId]?.vote === 'dislike' ? 'inactive' : null} `} onClick={() => toggleLike(arrId, 'dislike')}><i className="fas fa-thumbs-down fa-2x"></i></button>
                            //remover dislike
                        : voteData[arrId]?.vote === 'dislike' ?
                        <button className={`btn--like ${voteData[arrId]?.vote === 'dislike' ? 'inactive' : null} `} onClick={() => toggleLike(arrId, '')}><i className="fas fa-thumbs-down fa-2x"></i></button>
                    : null}
                </div> 
            </Panel>
        )
    }
}

export default Card;


