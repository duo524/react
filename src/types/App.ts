/*
 * @Author: renjinduo 'r1575976602@163.com'
 * @Date: 2024-11-02 15:27:33
 * @LastEditors: renjinduo 'r1575976602@163.com'
 * @LastEditTime: 2024-11-02 15:32:05
 * @FilePath: \reat-vite\src\types\App.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export type Item = {
    id: number;
    title: string;
    children: number[];
    isOpen: boolean;
};