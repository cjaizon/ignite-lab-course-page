import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from "react-router-dom";
import classNames from 'classnames'

interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date;
    type: 'live' | 'class';
}

export const Lesson = (props: LessonProps) => {
    const { slug } = useParams()

    const isLessonAvailable = isPast(props.availableAt)
    const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMM' • 'k'h'mm", {
        locale: ptBR
    })

    const isClass = slug == props.slug

    return (
        <Link to={`/event/lesson/${props.slug}`} className="group">
            <span className="text-gray-300">
                {availableDateFormatted}
            </span>
            <div
                className={classNames(
                    "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500", {
                    "bg-green-500 text-gray-600": isClass,
                }
                )}
            >
                <header className="flex items-center justify-between">
                    {isLessonAvailable ? (
                        <span className={classNames("text-sn  font-medium flex items-center gap-2", {
                            "text-blue-500": !isClass,
                            "text-white": isClass,
                        })}>
                            <CheckCircle size={20} />
                            Conteúdo liberado
                        </span>
                    ) : (
                        <span className="text-sn text-orange-500 font-medium flex items-center gap-2">
                            <Lock size={20} />
                            Em breve
                        </span>
                    )}
                    <span className={`text-xs rounded px-2 py-[2px] text-white border ${!isClass ? 'border-green-300' : 'border-white'}`}>
                        {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>
                <strong className={classNames(" mt-5 block", {
                    'text-white': isClass,
                    'text-gray-200': !isClass
                })}>
                    {props.title}
                </strong>
            </div>
        </Link >
    )
} 